import { Credit } from './credit';
export interface User {
    readonly id?: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly fullName?: string;
    readonly username?: string;
    readonly password?: string;
    readonly email?: string;
    readonly subId?: string;
    readonly phone?: string;
    readonly address?: string;
    readonly city?: string;
    readonly State?: string;
    readonly zipCode?: string;
    readonly country?: string;
    readonly paypal?: string;
    readonly birthday?: string;
    readonly selectedPrize?: string;
    readonly hold?: boolean;
    readonly holdReason?: String;
    readonly holdMessage?: String;
    readonly profilePending?: boolean;
    readonly pendingProfile?: any;
    readonly receiveEmailNotifications?: boolean;
    readonly receiveUpdateNotifications?: boolean;
    readonly receiveAdminMessages?: boolean;
    readonly receiveSponsorMessages?: boolean;
    readonly receiveReferralMessages?: boolean;
    readonly currentSponsor?: string;
    readonly currentSponsorEmail?: string;
    readonly referrals?: Object;
    readonly referralIds?: string[];
    readonly referralCount?: Number;
    readonly currentLevel?: Number;
    readonly payBeyondLevel?: Number;
    readonly leveledUp?: boolean;
    readonly hasQualifiedReferrals?: boolean;
    readonly hasReferralsBeyondLevel?: boolean;
    readonly orderPending?: boolean;
    readonly updatedAt?: Date;
    readonly createdAt?: Date;
    // Helpers //
    credits?: Credit[];
    requiresApproval?: true;
}
