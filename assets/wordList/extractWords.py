import json

def extract_keys_from_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    return data.keys()

def save_keys_to_file(keys, file_name):
    with open(file_name, 'w') as f:
        for key in keys:
            f.write(f'"{key}": 1,' + '\n')

keys = extract_keys_from_json('dictionary_compact.json')

save_keys_to_file(keys, 'words.txt')