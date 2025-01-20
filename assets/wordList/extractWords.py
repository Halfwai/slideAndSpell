import json
import time

import requests

def extract_keys_from_merged_words(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    # for key in data['synset']:
    #     for word in data['synset'][key]['word']:
    #         words[word] = data['synset'][key]['gloss']
            # words.append({word: data['synset'][key]['gloss']})
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

                # if len(meaning) > 0:
                #     meanings.append(meaning)
            # print(key, meanings)
            # words[key] = data[key]['MEANINGS']
    return words
    # return data['synset'].keys()

def extract_words_from_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    for key in data:
        if len(key) > 2 and len(key) < 7:
            if "[Obs.]" not in data[key]:
                definition = data[key].split(".")[0]
                words[key.lower()] = definition
            else:
                responseData = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{key}")
                time.sleep(0.5)
                try:
                    responseData.raise_for_status()
                except requests.exceptions.HTTPError as e:
                    print(f"Error: {key}")
                    continue
                json_data = responseData.json()
                try:
                    definition = json_data[0]['meanings'][0]['definitions'][0]['definition'].capitalize()
                    try: 
                        example = " \"" + json_data[0]['meanings'][0]['definitions'][0]['example'].capitalize() + "\""
                        definition = definition + example
                    except:
                        pass
                    words[key.lower()] = definition
                    print(f"Success: {key}: {definition}")
                except:
                    print(f"Error: {key}")
    return words

def extract_words_from_wordNet(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    for key in data['synset']:
        for word in data['synset'][key]['word']:
            if len(word) > 2 and len(word) < 7:
                words[word] = data['synset'][key]['gloss'].capitalize()
    return words

def save_dict_to_file(d, filename):
    with open (filename, 'w') as f:
        f.write(json.dumps(d))

# # https://github.com/nightblade9/simple-english-dictionary 
# wordsOne = extract_keys_from_merged_words('merged.json')
# # https://gitlab.com/infinitysearch/english-dictionary-json
wordsTwo = extract_words_from_json('simple_english_dictionary.json')
# # https://github.com/fluhus/wordnet-to-json?tab=readme-ov-file
# wordsThree = extract_words_from_wordNet('wordnet.json')

# print(wordsTwo)

# print(wordsOne["fuck"])

save_dict_to_file(wordsTwo, 'simple_dictionary_with_online_definitions')

# data = requests.get("https://api.dictionaryapi.dev/api/v2/entries/en/row")
# json_data = data.json()
# definition = json_data[0]['meanings'][0]['definitions'][0]['definition'].capitalize()
# try:
#     example = " \"" + json_data[0]['meanings'][0]['definitions'][0]['example'].capitalize() + "\""
#     definition = definition + example
# except: 
#     pass
# print(definition)