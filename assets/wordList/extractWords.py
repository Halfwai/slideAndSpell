import json

def extract_keys_from_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    words = {}
    # for key in data['synset']:
    #     for word in data['synset'][key]['word']:
    #         words[word] = data['synset'][key]['gloss']
            # words.append({word: data['synset'][key]['gloss']})
    for key in data:
        length = len(key)
        if  length > 2 and length < 7 and len(data[key]['MEANINGS']) > 0:
            words[key] = data[key]['MEANINGS']
    return words
    # return data['synset'].keys()

def save_dict_to_file(d, filename):
    with open (filename, 'w') as f:
        f.write(json.dumps(d))





words = extract_keys_from_json('merged.json')

print(len(words))

save_dict_to_file(words, 'mergedwords.txt')