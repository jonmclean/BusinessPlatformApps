import { SqlServerValidationUtility } from '../base/sql-server-validation-utility';

import { ActionResponse } from '../services/actionresponse';
import { DataStoreType } from '../services/datastore';
import { ViewModelBase } from '../services/viewmodelbase';

export class ASServer extends ViewModelBase {

    sku: string[] = ["D1", "S1", "S2"];
    emailAddress: string;
    password: string;
    server: string;
    ASServerType: ASServerInstallationType = ASServerInstallationType.New;

    constructor() {
        super();
        this.isValidated = false;
    }

    Invalidate() {
        super.Invalidate();
    }

    async OnValidate(): Promise<boolean> {
    }

    async NavigatingNext(): Promise<boolean> {

        this.MS.DataStore.addToDataStore('ASSku', this.emailAddress, DataStoreType.Public);
        this.MS.DataStore.addToDataStore('ASAdminPassword', this.password, DataStoreType.Public);
        this.MS.DataStore.addToDataStore('ASAdmin', this.emailAddress, DataStoreType.Public);

        if (this.server) {
            this.MS.DataStore.addToDataStore('ASServerUrl', this.server, DataStoreType.Public);
        } else {
            // Spin up new instance here
        }

        
       
    }

    async OnLoaded() {
    }
}

enum ASServerInstallationType {
    New,
    Existing,
    NoCreate
}