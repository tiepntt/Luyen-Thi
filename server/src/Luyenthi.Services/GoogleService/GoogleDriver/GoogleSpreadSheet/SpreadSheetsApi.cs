using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v2.Data;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Luyenthi.Services.GoogleService.GoogleAPI
{
    public class SpreadSheetsApi
    {
         string[] Scopes = { SheetsService.Scope.Spreadsheets };
         string ApplicationName = "Google Drive API .NET";
        public  SheetsService GetService()
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
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credentials,
                ApplicationName = ApplicationName,
            });

            return service;
        }
    }
}
