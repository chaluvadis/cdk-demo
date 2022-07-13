#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack } from '../lib/cdk-demo-stack';
import { getContext } from '../util';
const createStacks = async () => {
  try {
    const app = new cdk.App();
    console.log('app initializing');
    console.log(JSON.stringify(app, null, 2));
    const context = await getContext(app);
    const tags: any = {
      "Environment": context.environment,
    };

    const stackProps: cdk.StackProps = {
      env: {
        region: context.region,
        account: context.accountNumber,
      },
      stackName: `${context.appName}-${context.environment}-${context.branchName}`,
      description: `${context.appName}-${context.environment}-${context.branchName}`,
      tags: tags
    };
    new CdkDemoStack(app, 'CdkDemoStack', stackProps, context);
  } catch (error) {
    console.error(error);
  }
};

createStacks();