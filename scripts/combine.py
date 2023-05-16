import os 
import json

def combine_json_files(folder_path, output_file_path):
    combined_data = []

    def traverse_folder(folder_path):
        for entry in os.listdir(folder_path):
            entry_path = os.path.join(folder_path, entry)
            if os.path.isfile(entry_path) and entry.endswith(".json"):
                print("adding file: ", entry)
                with open(entry_path, 'r') as file:
                    try:
                        data = json.load(file)
                        if data: #checking if data even exists
                            combined_data.append(data)
                        else:
                            print(f"Skipping empty file: {entry_path}")
                    except json.JSONDecodeError:
                        print(f"Skipping file with invalid JSON: {entry_path}")
            elif os.path.isdir(entry_path):
                traverse_folder(entry_path) #Recursively traversing subfolders 

    traverse_folder(folder_path)

    with open(output_file_path, 'w') as output_file:
        json.dump(combined_data, output_file)


folder_path = '/Users/shaunsmerling/Desktop/experts-advice/data/'
output_file_path = '/Users/shaunsmerling/Desktop/experts-advice/data/hormozi.json'

combine_json_files(folder_path, output_file_path)


   