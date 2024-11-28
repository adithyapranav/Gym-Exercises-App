from elasticsearch import Elasticsearch
from rest_framework.views import APIView
from rest_framework.response import Response

# Elasticsearch client
es = Elasticsearch('https://localhost:9200/', basic_auth=('elastic', 'LH*mP68J7ga3g+5keZr9'), verify_certs=False)

class ExerciseSearchView(APIView):
    def get(self, request):
        muscle = request.query_params.get('BodyPart')
        level = request.query_params.get('Level')

        if not muscle or not level:
            return Response({'error': 'Please provide both muscle and level parameters'}, status=400)

        try:
            response = es.search(
                index="gym_exercises",
                body={
                    "query": {
                        "bool": {
                            "must": [
                                {"match": {"BodyPart": muscle}},
                                {"match": {"Level": level}}
                            ]
                        }
                    }
                }
            )

            exercises = [
                {
                    "title": hit["_source"]["Title"],
                    "body_part": hit["_source"]["BodyPart"],
                    "level": hit["_source"]["Level"]
                }
                for hit in response["hits"]["hits"]
            ]

            return Response(exercises)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
