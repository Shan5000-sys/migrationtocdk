"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ec2Stack = void 0;
const cdk = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
class Ec2Stack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create a Security Group for the EC2 instance
        const ec2SecurityGroup = new ec2.SecurityGroup(this, 'Ec2SecurityGroup', {
            vpc: props.vpc,
            allowAllOutbound: true
        });
        // Allow inbound traffic only from the Bastion Host
        ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), // Consider limiting this to Bastion IP
        ec2.Port.tcp(22), 'Allow SSH access from Bastion Host');
        // Application EC2 Instance
        new ec2.Instance(this, 'ApplicationServer', {
            vpc: props.vpc,
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }, // ✅ Ensures instance is private
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.latestAmazonLinux2(),
            securityGroup: ec2SecurityGroup,
            keyName: 'techhealth-key' // Replace with your SSH key
        });
    }
}
exports.Ec2Stack = Ec2Stack;
