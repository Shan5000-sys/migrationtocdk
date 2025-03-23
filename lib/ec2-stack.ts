import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface Ec2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class Ec2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: Ec2StackProps) {
        super(scope, id, props);

        // 🔒 Bastion Host Security Group
        const bastionSecurityGroup = new ec2.SecurityGroup(this, 'BastionSecurityGroup', {
            vpc: props.vpc,
            allowAllOutbound: true
        });

        // Allow SSH from your IP to the Bastion Host for secure access
        bastionSecurityGroup.addIngressRule(
            ec2.Peer.ipv4('99.226.228.199/32'), // 👈 Replace with your IP for secure SSH access
            ec2.Port.tcp(22),
            'Allow SSH from your IP to Bastion Host'
        );

        // ✅ Bastion Host (Deployed in Public Subnet)
        const bastionHost = new ec2.Instance(this, 'BastionHost', {
            vpc: props.vpc,
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }, // ✅ Deploy to Public Subnet
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.latestAmazonLinux2(),
            securityGroup: bastionSecurityGroup,
            keyName: 'techhealth-key'  // Replace with your SSH key
        });

        // 🔒 Application EC2 Security Group
        const ec2SecurityGroup = new ec2.SecurityGroup(this, 'Ec2SecurityGroup', {
            vpc: props.vpc,
            allowAllOutbound: true
        });

        // ✅ Allow SSH ONLY from Bastion Host's Security Group (More Secure)
        ec2SecurityGroup.addIngressRule(
            bastionSecurityGroup,  // ✅ Limits access to only Bastion Host
            ec2.Port.tcp(22), 
            'Allow SSH from Bastion Host'
        );

        // ✅ Application EC2 Instance (Private Subnet)
        new ec2.Instance(this, 'ApplicationServer', {
            vpc: props.vpc,
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }, 
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.latestAmazonLinux2(),
            securityGroup: ec2SecurityGroup,
            keyName: 'techhealth-key'
        });
    }
}