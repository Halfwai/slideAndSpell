import json
import time

import requests

def extract_keys_from_merged_words(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    for key in data:
        length = len(key)
        if  length > 2 and length < 7 and len(data[key]['MEANINGS']) > 0:
            for meaning in data[key]['MEANINGS']:
                definition = ""
                for m in meaning:
                    if m == "Noun" or m == "Verb" or m == "Adjective" or m == "Adverb":
                        pass
                    elif type(m) == str:
                        definition = m
                words[key.lower()] = definition.capitalize()
    return words

def extract_words_from_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    for key in data:
        if len(key) > 2 and len(key) < 7:
            # Filter out words that are not words or are archaic words
            if "[Obs.]" not in data[key] and "-" not in key and "." not in key and "suffix" not in data[key] and "prefix" not in data[key]:
                definition = data[key]
                # If the definition is a reference to another word, get the definition of that word
                if "See" in definition:
                    try:
                        newKey = definition.split("See ")[1].lower()
                        newKey = newKey.replace(",", "")
                        definition = data[newKey]
                    except:
                        # If the word is not in the dictionary, try to get the definition online
                        definition = get_online_definition(key)
                if definition:          
                    words[key.lower()] = definition
                    continue
    return words

def extract_words_from_wordNet(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    for key in data['synset']:
        for word in data['synset'][key]['word']:
            if len(word) > 2 and len(word) < 7:
                # filter our words that are not words
                if "a" not in word and "e" not in word and "i" not in word and "o" not in word and "u" not in word and "y" not in word:
                    continue
                if "." in word or "-" in word:
                    continue   
                # filter out names
                if "(born )" in word:
                    continue  
                words[word.lower()] = data['synset'][key]['gloss'].capitalize()
    return words

def get_online_definition(word):
    try:
        data = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
        time.sleep(0.5)
        json_data = data.json()
        print(json_data)
        definition = json_data[0]['meanings'][0]['definitions'][0]['definition'].capitalize()
        print(f"{word}: {definition}")
    except:
        print(f"Failed to get definition for {word}")
        return False
    try:
        example = " \"" + json_data[0]['meanings'][0]['definitions'][0]['example'].capitalize() + "\""
        definition = definition + example
    except: 
        pass
    return definition

def combine_dicts(d1, d2, d3):
    for key in d2:
        if key not in d1:
            d1[key] = d2[key]
    for key in d3:
        if key not in d1:
            d1[key] = d3[key]
    return d1

def save_dict_to_file(d, filename):
    with open (filename, 'w') as f:
        f.write(json.dumps(d))

# wordnet.json is a version of the wordnet database in json format found here https://github.com/fluhus/wordnet-to-json?tab=readme-ov-file
wordsOne = extract_words_from_wordNet('wordnet.json')
# This json dictionary was sourced from this github page https://github.com/nightblade9/simple-english-dictionary 
wordsTwo = extract_keys_from_merged_words('merged.json')
# This is a stripped down version of Webster's unabridged Dictionary taken from here https://gitlab.com/infinitysearch/english-dictionary-json
wordsThree = extract_words_from_json('simple_and_online.json')


combined = combine_dicts(wordsOne, wordsTwo, wordsThree)

save_dict_to_file(combined, 'combined.json')