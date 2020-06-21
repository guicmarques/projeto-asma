import json
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

try:
    import server.settings as settings
except:
    import settings

APIkey = settings.watsonCredentials["API_key"]
assistantId = settings.watsonCredentials["assistant_id"]


authenticator = IAMAuthenticator(APIkey)
assistant = AssistantV2(
    version='2020-04-01',
    authenticator=authenticator)
assistant.set_service_url('https://gateway.watsonplatform.net/assistant/api')


def askWatson(text):
    global assistant, assistantId

    sessionId = assistant.create_session(
        assistantId).get_result()["session_id"]

    message = assistant.message(
        assistantId,
        sessionId,
        input={'text': text}
    ).get_result()

    responses = []
    intent = ""
    
    if "output" in message:
        if "intents" in message["output"]:
            intents = message["output"]["intents"]
            if len(intents) > 0:
                intent = str(intents[0]['intent'])
            # .decode('unicode_escape')
        if "generic" in message["output"]:
            answers = message["output"]["generic"]
            for answer in answers:
                if "text" in answer:
                    ans = str(answer["text"])
                    responses.append(ans)

    assistant.delete_session(assistantId, sessionId).get_result()

    return intent, responses


if __name__ == "__main__":
    print(askWatson('Bombinha?'))
