﻿using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Finder.Web.Controllers.Api
{
    using Core.Models;
    using Models;

    public class AuthenticationController : ApiController
    {
        public HttpResponseMessage Patch(UserApiModel user)
        {
                var databaseConnection = new DatabaseConnection();

                var queryData = databaseConnection.GetData($"SELECT passwort FROM user WHERE benutzername = '" + user.userName + "'");


                if (queryData[0].GetValue(0).ToString() == user.password)
                {
                    return this.Request.CreateResponse(HttpStatusCode.OK);
                }

                return this.Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        public HttpResponseMessage Post(UserApiModel user)
        {
            var databaseConnection = new DatabaseConnection();

            var queryData = databaseConnection.GetData($"SELECT * FROM user WHERE benutzername = '" + user.userName +"'");
            databaseConnection.CloseConnection();

            if (queryData.Count > 0)
            {
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            try
            {
                databaseConnection.QueryInsert($"INSERT INTO user (`benutzername`, `vorname`, `nachname`, `passwort`) VALUES (\'{user.userName}\', \'{user.firstName}\' , \'{user.lastName}\', \'{user.password}\')");
            }
            catch (Exception e)
            {
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            return this.Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
