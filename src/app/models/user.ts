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
    readonly profilePending?: boolean;
    readonly pendingProfile?: any;
    readonly receiveEmailNotifications?: boolean;
    readonly receiveNotificationsFromSponsor?: boolean;
    readonly receiveNotificationsFromReferrals?: boolean;
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
    // Helpers //
    credits?: Credit[];
    requiresApproval?: true;
}
