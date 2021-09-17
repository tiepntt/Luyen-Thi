using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v2;
using Google.Apis.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Luyenthi.Services.GoogleAPI
{
    public class GoogleDriverApi
    {
         string[] Scopes = { DriveService.Scope.Drive };
         string ApplicationName = "Google Drive API .NET";
        public  DriveService GetService()
        {
            GoogleCredential credentials;

            using (var stream =
                new FileStream("Credentials/GoogleApi/account.json", FileMode.Open, FileAccess.Read))
            {
                credentials = GoogleCredential.FromStream(stream);
                if (credentials.IsCreateScopedRequired)
                {
                    credentials = credentials.CreateScoped(Scopes);
                }
            }
            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credentials,
                ApplicationName = ApplicationName,
            });

            return service;
        }
        // create
        // coppy
        // remove


    }
}
