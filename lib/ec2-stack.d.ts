import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
interface Ec2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}
export declare class Ec2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: Ec2StackProps);
}
export {};
