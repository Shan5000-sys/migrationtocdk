import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface BastionStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class BastionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: BastionStackProps) {
        super(scope, id, props);

        new ec2.Instance(this, 'BastionHost', {
            vpc: props.vpc,
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.latestAmazonLinux2(),
            keyName: 'bastion'
        });
    }
}