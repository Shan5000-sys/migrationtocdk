import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VpcStack } from './vpc-stack';
import { RdsStack } from './rds-stack';

export class MigrationToCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpcStack = new VpcStack(this, 'VpcStack');
        
        // Correctly pass VPC as a property
        new RdsStack(this, 'RdsStack', { vpc: vpcStack.vpc });
    }
}

