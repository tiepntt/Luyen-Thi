using System;
using System.Linq;
using System.Collections.Generic;

namespace Luyenthi.Core.Dtos
{
    public class SendMailDto
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}