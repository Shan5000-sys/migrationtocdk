"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BastionStack = void 0;
const cdk = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
class BastionStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new ec2.Instance(this, 'BastionHost', {
            vpc: props.vpc,
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.latestAmazonLinux2(),
            keyName: 'bastion'
        });
    }
}
exports.BastionStack = BastionStack;
