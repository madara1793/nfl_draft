from django.urls import path
from .views import get_teams, get_team, add_team, get_teamoutline, get_players

urlpatterns = [
    path("teams/", get_teams, name="get_teams"),
    path("teams/<str:team_name>/", get_team, name="get_team"),
    path("teams/<str:team_name>/outline/", get_teamoutline, name="get_team_outline"),
    path("teams/add/", add_team, name="add_team"),
    path("players/", get_players, name="get_players"),
]
