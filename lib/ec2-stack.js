"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ec2Stack = void 0;
const cdk = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
class Ec2Stack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create a Security Group for the Bastion Host
        const bastionSecurityGroup = new ec2.SecurityGroup(this, 'BastionSecurityGroup', {
            vpc: props.vpc,
            allowAllOutbound: true
        });
        // Allow SSH (port 22) access only from trusted IPs
        bastionSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), // Consider limiting this to your IP
        ec2.Port.tcp(22), 'Allow SSH access for Bastion');
        // Bastion Host Instance
        new ec2.Instance(this, 'BastionHost', {
            vpc: props.vpc,
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }, // ✅ Ensure Bastion is in Public Subnet
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.latestAmazonLinux2(), // ✅ Correct Amazon Linux 2
            securityGroup: bastionSecurityGroup,
            keyName: 'techhealth-key' // Replace with your SSH key
        });
    }
}
exports.Ec2Stack = Ec2Stack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWMyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWMyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQywyQ0FBMkM7QUFNM0MsTUFBYSxRQUFTLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFvQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QiwrQ0FBK0M7UUFDL0MsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQzdFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztZQUNkLGdCQUFnQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBRUgsbURBQW1EO1FBQ25ELG9CQUFvQixDQUFDLGNBQWMsQ0FDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRyxvQ0FBb0M7UUFDekQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ2hCLDhCQUE4QixDQUNqQyxDQUFDO1FBRUYsd0JBQXdCO1FBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ2xDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztZQUNkLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLHVDQUF1QztZQUMxRixZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUM5QyxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxFQUFHLDJCQUEyQjtZQUNqRixhQUFhLEVBQUUsb0JBQW9CO1lBQ25DLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBRSw0QkFBNEI7U0FDMUQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBM0JELDRCQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcblxuaW50ZXJmYWNlIEVjMlN0YWNrUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gICAgdnBjOiBlYzIuVnBjO1xufVxuXG5leHBvcnQgY2xhc3MgRWMyU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBFYzJTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIFNlY3VyaXR5IEdyb3VwIGZvciB0aGUgQmFzdGlvbiBIb3N0XG4gICAgICAgIGNvbnN0IGJhc3Rpb25TZWN1cml0eUdyb3VwID0gbmV3IGVjMi5TZWN1cml0eUdyb3VwKHRoaXMsICdCYXN0aW9uU2VjdXJpdHlHcm91cCcsIHtcbiAgICAgICAgICAgIHZwYzogcHJvcHMudnBjLFxuICAgICAgICAgICAgYWxsb3dBbGxPdXRib3VuZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBbGxvdyBTU0ggKHBvcnQgMjIpIGFjY2VzcyBvbmx5IGZyb20gdHJ1c3RlZCBJUHNcbiAgICAgICAgYmFzdGlvblNlY3VyaXR5R3JvdXAuYWRkSW5ncmVzc1J1bGUoXG4gICAgICAgICAgICBlYzIuUGVlci5hbnlJcHY0KCksICAvLyBDb25zaWRlciBsaW1pdGluZyB0aGlzIHRvIHlvdXIgSVBcbiAgICAgICAgICAgIGVjMi5Qb3J0LnRjcCgyMiksIFxuICAgICAgICAgICAgJ0FsbG93IFNTSCBhY2Nlc3MgZm9yIEJhc3Rpb24nXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQmFzdGlvbiBIb3N0IEluc3RhbmNlXG4gICAgICAgIG5ldyBlYzIuSW5zdGFuY2UodGhpcywgJ0Jhc3Rpb25Ib3N0Jywge1xuICAgICAgICAgICAgdnBjOiBwcm9wcy52cGMsXG4gICAgICAgICAgICB2cGNTdWJuZXRzOiB7IHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQyB9LCAvLyDinIUgRW5zdXJlIEJhc3Rpb24gaXMgaW4gUHVibGljIFN1Ym5ldFxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBuZXcgZWMyLkluc3RhbmNlVHlwZSgndDIubWljcm8nKSxcbiAgICAgICAgICAgIG1hY2hpbmVJbWFnZTogZWMyLk1hY2hpbmVJbWFnZS5sYXRlc3RBbWF6b25MaW51eDIoKSwgIC8vIOKchSBDb3JyZWN0IEFtYXpvbiBMaW51eCAyXG4gICAgICAgICAgICBzZWN1cml0eUdyb3VwOiBiYXN0aW9uU2VjdXJpdHlHcm91cCxcbiAgICAgICAgICAgIGtleU5hbWU6ICd0ZWNoaGVhbHRoLWtleScgIC8vIFJlcGxhY2Ugd2l0aCB5b3VyIFNTSCBrZXlcbiAgICAgICAgfSk7XG4gICAgfVxufSAiXX0=