"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationToCdkStack = void 0;
const cdk = require("aws-cdk-lib");
const vpc_stack_1 = require("./vpc-stack");
const rds_stack_1 = require("./rds-stack");
class MigrationToCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpcStack = new vpc_stack_1.VpcStack(this, 'VpcStack');
        // Correctly pass VPC as a property
        new rds_stack_1.RdsStack(this, 'RdsStack', { vpc: vpcStack.vpc });
    }
}
exports.MigrationToCdkStack = MigrationToCdkStack;
