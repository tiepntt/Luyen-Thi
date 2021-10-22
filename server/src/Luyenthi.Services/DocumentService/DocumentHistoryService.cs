using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class DocumentHistoryService
    {
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        public DocumentHistoryService() { }
        public DocumentHistory Create(DocumentHistory documentHistory)
        {
             _documentHistoryRepository.Add(documentHistory);
            return documentHistory;
        }
        public DocumentHistory Update()
        {
            return new DocumentHistory();
        }
        public DocumentHistory GetById()
        {
            return new DocumentHistory();
        }
        public DocumentHistory GetDetail()
        {
            return new DocumentHistory();
        }
    }
}
