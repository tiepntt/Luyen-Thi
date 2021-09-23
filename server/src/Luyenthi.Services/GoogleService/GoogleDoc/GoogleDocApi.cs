using Google.Apis.Auth.OAuth2;
using Google.Apis.Docs.v1;
using Google.Apis.Docs.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Luyenthi.Services.GoolgeAPI
{
    public class GoogleDocApi
    {
        static string[] Scopes = { DocsService.Scope.Documents };
        static string ApplicationName = "Google Docs API .NET";
        public static DocsService GetService()
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
            var service = new DocsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credentials,
                ApplicationName = ApplicationName,
            });

            return service;
        }

        public static async Task<Document> GetDocument(DocsService service, string documentId)
        {
            DocumentsResource.GetRequest request = service.Documents.Get(documentId);

            Document doc = await request.ExecuteAsync();

            return doc;
        }
        public static async Task Update(DocsService docsService, List<Request> requests, string documentId )
        {
            await docsService.Documents.BatchUpdate(
                new BatchUpdateDocumentRequest() { Requests = requests }, 
                documentId)
                .ExecuteAsync();
        }

    }
}
