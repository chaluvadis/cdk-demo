import { App } from "aws-cdk-lib";
import { CDKContext } from "../models";
import * as gitBranch from "git-branch";
export const getContext = async (app: App): Promise<CDKContext> => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentBranch = await gitBranch();
            console.log(`Current branch: ${currentBranch}`);
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