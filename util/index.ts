import * as cdk from "aws-cdk-lib";
import { CDKContext } from "../models";
import * as gitBranch from "git-branch";
export const getContext = async (app: cdk.App): Promise<CDKContext> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('app');
            console.log(JSON.stringify(app));
            const currentBranch = await gitBranch();
            console.log(`Current branch: ${currentBranch}`);
            const context = app.node.tryGetContext("enviroment");
            console.log("Context");
            console.log(JSON.stringify(context, null, 2));
            const environment = app.node.tryGetContext("environment").find((e: any) => e.branchName === currentBranch);
            console.log("Environment:");
            console.log(JSON.stringify(environment, null, 2));

            const globals = app.node.tryGetContext("globals");
            console.log("Globals:");
            console.log(JSON.stringify(globals, null, 2));
            return resolve({ ...globals, ...environment });
        } catch (error) {
            console.error(error);
            return reject(error);
        }
    });
};