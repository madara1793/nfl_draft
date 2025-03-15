from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Team
from .models import Player

@api_view(["GET"])
def get_teams(request):
    teams = Team.get_all_teams()
    return Response({"teams": teams})

@api_view(["GET"])
def get_team(request, team_name):
    team = Team.get_team_by_name(team_name)
    if team:
        return Response({"team": team})
    return Response({"error": "Team not found"}, status=404)

@api_view(["GET"])
def get_teamoutline(request, team_name):
    team = Team.get_team_by_name(team_name)
    players = Player.get_players_by_team(team_name)
    roster = list(players)
    if team:
        return Response({"team": team, "players": roster})
    return Response({"error": "Team not found"}, status=404)

@api_view(["POST"])
def add_team(request):
    team_data = request.data
    result = Team.add_team(team_data)
    return Response({"message": "Team added", "id": str(result.inserted_id)})

@api_view(["GET"])
def get_players(request):
    players = Player.get_all_players()
    return Response({"players": players})