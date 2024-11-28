from elasticsearch import Elasticsearch, helpers
import json

# Elasticsearch client
es = Elasticsearch('https://192.168.0.67:9200/', basic_auth=('elastic', 'LH*mP68J7ga3g+5keZr9'), verify_certs=False)

# Define the index name
index_name = "gym_exercises"

# Read and prepare data
with open("filtered_gym.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Create index if not exists
if not es.indices.exists(index=index_name):
    es.indices.create(index=index_name)

# Prepare documents with index name
actions = [
    {
        "_index": index_name,
        "_source": doc
    }
    for doc in data
]
# Bulk upload
helpers.bulk(es, actions)

print(f"Data indexed successfully in '{index_name}' index!")

'''
#Verifying the upload
index_name = "gym_exercises"

# Search for all documents
response = es.search(index=index_name, body={"query": {"match_all": {}}}, size=100)

# Print the results
print("Documents in index:")
for hit in response['hits']['hits']:
    print(hit["_source"])
'''