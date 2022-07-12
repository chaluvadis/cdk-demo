import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamoDb from "aws-cdk-lib/aws-dynamodb";
import { CDKContext } from '../models';
export class CdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, context: CDKContext) {
    super(scope, id, props);
    // S3 Bucket
    const demoBucket = new s3.Bucket(this, 'DemoBucket', {
      bucketName: `${context.appName}-${context.environment}-${context.branchName}`,
      encryption: context.s3Encrypt ? s3.BucketEncryption.S3_MANAGED : s3.BucketEncryption.UNENCRYPTED,
    });

    // DynamoDB Table
    const demoTable = new dynamoDb.Table(this, 'DemoTable', {
      tableName: `${context.appName}-${context.environment}-${context.branchName}`,
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "hashKey", type: dynamoDb.AttributeType.STRING },
      sortKey: { name: "rangeKey", type: dynamoDb.AttributeType.STRING },
      pointInTimeRecovery: context.ddPITRecovery
    });

    // Outputs
    new CfnOutput(this, 'demoBucketArn', {
      value: demoBucket.bucketArn,
      exportName: `${context.appName}-${context.environment}-${context.branchName}-bucket-arn`
    });

    new CfnOutput(this, 'demoTableArn', {
      value: demoTable.tableArn,
      exportName: `${context.appName}-${context.environment}-${context.branchName}-table-arn`
    });
  }
}
