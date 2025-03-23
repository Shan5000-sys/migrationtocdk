import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface RdsStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class RdsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: RdsStackProps) {
        super(scope, id, props);

        if (!props.vpc) {
            throw new Error('VPC is required for RdsStack.');
        }

        new rds.DatabaseInstance(this, 'RdsInstance', {
            engine: rds.DatabaseInstanceEngine.postgres({
                version: rds.PostgresEngineVersion.VER_14
            }),
            vpc: props.vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },  // ✅ Corrected to use Isolated Subnet
            allocatedStorage: 20,
            publiclyAccessible: false,
            backupRetention: cdk.Duration.days(7)
        });
    }
}



