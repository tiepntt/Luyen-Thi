using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Luyenthi.Services.GoogleService
{
    public class GoogleSheetApi
    {
        static string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static string ApplicationName = "Google Sheets API .NET Quickstart";

        public static SheetsService GetService()
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

        public static  async Task<ValueRange> GetValueRange(SheetsService service, string spreadsheetId, string range)
        {
            var request = service.Spreadsheets.Values.Get(spreadsheetId, range);

            var response = await request.ExecuteAsync();

            return response;
        }
        public static async Task<IList<Sheet>> GetSheets(SheetsService service, string spreadsheetId)
        {
            var request = service.Spreadsheets.Get(spreadsheetId);
            request.Ranges = new List<string>();
            request.IncludeGridData = true;

            var response = await request.ExecuteAsync();
            return response.Sheets;
        }

        public static IList<Sheet> GetDataAndFormatRanges(SheetsService service, string spreadsheetId, List<string> ranges)
        {
            var request = service.Spreadsheets.Get(spreadsheetId);
            request.Ranges = ranges;
            request.IncludeGridData = true;

            var response = request.Execute();

            return response.Sheets;
        }
        public static void ClearSheet(SheetsService service, string spreadsheetId, string range = "A1:Z1000")
        {
            ClearValuesRequest requests = new ClearValuesRequest()
            {
            };
            service.Spreadsheets.Values.Clear(requests, spreadsheetId, range).Execute();
        }
    }
}
