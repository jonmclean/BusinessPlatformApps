using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AnalysisServices.Tabular;
using Microsoft.Azure;
using Microsoft.Deployment.Common.ActionModel;
using Microsoft.Deployment.Common.Actions;
using Microsoft.Deployment.Common.Helpers;
using Newtonsoft.Json.Linq;

namespace Microsoft.Deployment.Actions.AzureCustom.AzureAS
{
    [Export(typeof(IAction))]
    public class ValidateAzureASConnection : BaseAction
    {
        public override async Task<ActionResponse> ExecuteActionAsync(ActionRequest request)
        {
            string admin = request.DataStore.GetValue("ASAdmin");
            string password = request.DataStore.GetValue("ASPassword");
            string serverUrl = request.DataStore.GetValue("ASServerUrl");

            Server server = new Server();
            string connectionString = $"Provider=MSOLAP;Data Source={serverUrl};User ID={admin};Password={password};Persist Security Info=True; Impersonation Level=Impersonate;";
            server.Connect(connectionString);
            return new ActionResponse(ActionStatus.Success);
        }
    }
}
