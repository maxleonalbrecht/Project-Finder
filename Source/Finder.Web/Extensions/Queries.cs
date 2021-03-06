﻿namespace Finder.Web.Extensions
{
    using Core.Models;

    public static class Extensions
    {
        public static int QueryUserId(string username)
        {
            if (username == null)
            {
                return -1;
            }
            var databaseConnection = new DatabaseConnection();
            var queryData = databaseConnection.GetData($"SELECT iduser FROM user WHERE benutzername = '" + username + "'");

                return (int)queryData[0].GetValue(0);
        }

        public static int QueryMovieId(string movieTitle)
        {
            var databaseConnection = new DatabaseConnection();
            var queryData = databaseConnection.GetData($"SELECT idMovie FROM movie WHERE title = '" + movieTitle + "'");

            return (int)queryData[0].GetValue(0);
        }
    }
}