from django.db import models

# Create your models here.
from django.conf import settings

# Get the MongoDB database
db = settings.MONGO_DB

class Team:
    collection = db["teams"]  # MongoDB collection

    @staticmethod
    def get_all_teams():
        print('get_all_teams')
        return list(Team.collection.find({}, {"team_shortform": 1, "_id": 0}))

    @staticmethod
    def get_team_by_name(team_shortform):
        return Team.collection.find_one({"team_shortform": team_shortform}, {"_id": 0})

    @staticmethod
    def add_team(team_data):
        return Team.collection.insert_one(team_data)

class Player:
    collection = db["players"] #MongoDB collection

    @staticmethod
    def get_all_players():
        return list(Player.collection.find({}, {"_id": 0}))  # Exclude _id
    
    @staticmethod
    def get_player_by_name(player_name):
        return Player.collection.find_one({"player_name": player_name}, {"_id": 0})
    
    @staticmethod
    def get_players_by_team(team_shortform):
        roster = Player.collection.find({"team_shortform": team_shortform}, {"_id": 0})
        return list(roster)
    
    @staticmethod
    def add_player(player_data):
        return Player.collection.insert_one(player_data)