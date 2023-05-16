from youtube_channel_transcript_api import YoutubeChannelTranscripts
import json 

key = 'AIzaSyC0ltGYF7Ps7dxg2KAYhkRDfhn6GJ1m35s'

channel_getter = YoutubeChannelTranscripts('Alex Hormozi', key)

channel_getter.write_transcripts('/Users/shaunsmerling/Desktop/experts-advice/data/', just_text=True)