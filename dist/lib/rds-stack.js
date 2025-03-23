"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdsStack = void 0;
const cdk = require("aws-cdk-lib");
const rds = require("aws-cdk-lib/aws-rds");
const ec2 = require("aws-cdk-lib/aws-ec2");
class RdsStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED }, // ✅ Corrected to use Isolated Subnet
            allocatedStorage: 20,
            publiclyAccessible: false,
            backupRetention: cdk.Duration.days(7)
        });
    }
}
exports.RdsStack = RdsStack;
