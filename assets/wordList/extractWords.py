import json

def extract_keys_from_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    for key in data['synset']:
        for word in data['synset'][key]['word']:
            words[word] = data['synset'][key]['gloss']
            # words.append({word: data['synset'][key]['gloss']})
    return words
    # return data['synset'].keys()

def save_dict_to_file(d, filename):
    with open (filename, 'w') as f:
        f.write(json.dumps(d))





words = extract_keys_from_json('wordnet.json')

save_dict_to_file(words, 'words.txt')