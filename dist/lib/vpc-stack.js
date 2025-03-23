"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcStack = void 0;
const cdk = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
class VpcStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.vpc = new ec2.Vpc(this, 'TechHealthVpc', {
            cidr: '10.0.0.0/16',
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'PublicSubnet',
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 24,
                    name: 'PrivateSubnet',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                },
                {
                    cidrMask: 24,
                    name: 'IsolatedSubnet',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // ✅ Ensure Isolated Subnet is defined
                }
            ],
            natGateways: 0
        });
        // Add explicit tag to Isolated Subnet (Ensures RDS recognizes it)
        this.vpc.isolatedSubnets.forEach((subnet, index) => {
            cdk.Tags.of(subnet).add('aws-cdk:subnet-type', 'Isolated');
        });
    }
}
exports.VpcStack = VpcStack;
