import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
interface BastionStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}
export declare class BastionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: BastionStackProps);
}
export {};
