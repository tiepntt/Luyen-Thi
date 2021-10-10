using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Luyenthi.Core.Dtos;

namespace Luyenthi.Services
{
    public interface IMailService
    {
        Task SendMailAsync(SendMailDto mailRequest);
    }
}
