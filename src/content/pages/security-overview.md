---
layout: Page
title: Security Overview
noindex: true
---

# Security Overview

**Last Updated: December 9, 2022**

Materialize is committed to the delivery of the highest quality software and services to our customers. Essential to that quality is a steadfast dedication to security in all aspects of our business. We maintain a set of internal information security policies and processes based on controls and best practices from AICPA SOC 2. The purpose of this document is to highlight processes and controls that Materialize has in place to ensure protection and security of our customer data. Policies that are related to Materialize Cloud are specifically called out when relevant.

In this document, Materialize Cloud refers to the cloud offering where Materialize hosts and manages a customer’s Materialize instances.

**1. Customer Data Access and Management**

Each Materialize Cloud customer receives a Materialize region or regions, each of which is in a dedicated container within a Materialize-operated Amazon Web Services (AWS) account. Materialize uses infrastructure as code software to enforce standard infrastructure configurations for production servers on AWS. Using separate containers ensures each deployment is separated from other deployments. A limited number of Materialize employees who require such access are granted access to these containers, as specified in the contracts between Materialize and the customer. Access to these containers requires a series of authentication and authorization controls, including Multi-Factor Authentication (MFA). Customer data is not authorized to exit the production environment, except in limited circumstances such as in support of a customer request.

**2. Encryption of Customer Data**

All traffic between Materialize nodes as well as client-server communications is encrypted for Materialize Cloud managed clusters. Materialize uses TLS 1.2 digital certificates for inter-node and client-node authentication. TLS encryption is enabled by default for all secure clusters and needs no additional configuration.

**3. Retention of Customer Data**

Materialize stores a customer’s data for the duration of their contract. Materialize may delete all Customer Data in its systems or otherwise in its possession or under its control at any time following termination of a contract, with the exception of data that is required to establish proof of a right or a contract, which will be stored for the duration provided by enforceable law. Once deleted, a user’s data cannot be restored.

**4. Security Controls Framework**

Materialize follows processes and policies that are designed to protect customer data, information, and related assets from threats to security and availability.

**5. Security Incident Response Management**

Materialize has a process for identifying and managing security vulnerabilities and threats. Once a security vulnerability has been detected, appropriate staff at Materialize are assigned to immediately fix it. Upgrades to the patch are automatically performed for our Materialize Cloud customer instances, and customers are notified after the patch. For customers running Materialize on-premises, Materialize may, depending on the severity of the issue, notify all paid customers and provide them sufficient time to address the issue, including upgrading to a patch, if necessary. This will be followed up with a notification and updated patch on open channels such as Forum on our website. Following this public release, an internal post mortem is conducted to understand the cause of the incident, and corrective action necessary to prevent future similar incidents. Materialize also has a [Responsible Disclosure Policy](http://materialize.com/securitydisclosure) outlined on our website. Our release notes contain updates on security vulnerabilities and patches, when they occur.

**6. Business Continuity**

Materialize has a Business Continuity Plan when an event or series of events impacts Materialize. For our Materialize Cloud solution, all customer information is maintained on servers hosted in the cloud. Materialize Cloud is continuously monitored for outages. Since Materialize does not process, maintain or transfer any Customer information onto servers in its corporate locations, any event that affects the Materialize corporate facility will not have an impact on the services of our Customers. Additionally by design and practice there are no critical dependencies of the daily operations of Materialize customer support on these facilities.

In the event an incident occurs that renders the corporate facilities (headquarters) of Materialize unusable for some period of time (i.e. a natural disaster), staff will continue to provide service working from home offices. Materialize performs business continuity, disaster recovery, and risk assessment tests annually.

**7. Physical Security**

Materialize Cloud is hosted within Cloud Provider AWS today. All physical security controls are managed by the Cloud Provider. Materialize corporate offices do not house any servers that host customer clusters.

Only Materialize employees, contractors, and vendors with regular facilities access will be issued an access card and permitted to physically access the Materialize corporate offices without escort. Materialize personnel are not permitted to loan out an access card to anyone, not even fellow Materialize personnel. Materialize employees, contractors, and vendors are responsible for the badge issued them, and its use. The physical location of the offices are monitored by 24×7 CCTV cameras.

**8. Risk Management**

Materialize’s risk management policy includes controls specific for complying with AICPA SOC2 Trust Services Criteria.

Materialize has a corporate Risk Management Policy which applies to all Materialize employees, contractors, vendors and agents as well as all Materialize business processes, procedures and activities. While the focus is primarily Information Technology and Security and Availability, threats or vulnerabilities outside these areas identified by this process will be escalated to executive management for action and timely resolution.

All Materialize employees undergo regular security training and are encouraged to participate in helping secure our customer data and company assets. Employees who violate our customer data policies may face disciplinary consequences in proportion to their violation.

Materialize also has a Business Continuity Plan (see section 6). It contains instructions for Business Operations in the event of full or partial unavailability of a Materialize facility.

Materialize enters into Data Processing Agreements with its Authorized Sub-Processors with data protection obligations substantially similar to those contained in this Addendum.

**9. Customer Responsibilities**

Materialize has designed its application and Materialize Cloud with the assumption that certain controls will be the responsibility of its customers. The following is a representative list of controls that are recommended to be used to reduce risk and enhance security when using the service.

Customers are responsible for adding and managing user accounts, credentials and access rights to the cluster.

Customers are responsible for the strength of the passwords they choose for signing into the Materialize Cloud console.

Customers are responsible for identifying approved points of contacts to coordinate with Materialize. The Support team may reach out to the designated contact to validate requests.

Customers are responsible for validating the accuracy and completeness of data contained in their environment.

Customers are responsible for data confidentiality controls at their organizations, such as segregation of duties, (non-)disclosure of information at the customer organization.

Customers are responsible for responding to requests from individuals to delete or erase information, including personal data, that may be contained in information or data provided or made available by customer (or its authorized users) to Materialize.
