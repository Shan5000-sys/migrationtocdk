import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { BastionStack } from '../lib/bastion-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { RdsStack } from '../lib/rds-stack';

const app = new cdk.App();

// Create VPC Stack
const vpcStack = new VpcStack(app, 'MigrationToCdkStack/VpcStack');

// Create Bastion Stack (public subnet)
new BastionStack(app, 'MigrationToCdkStack/BastionStack', {
    vpc: vpcStack.vpc
});

// Create Application EC2 Stack (private subnet)
new Ec2Stack(app, 'MigrationToCdkStack/Ec2Stack', {
    vpc: vpcStack.vpc
});

// Create RDS Stack (isolated subnet)
new RdsStack(app, 'MigrationToCdkStack/RdsStack', {
    vpc: vpcStack.vpc
});