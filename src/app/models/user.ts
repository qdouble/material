import { Credit } from './credit';
import { GenericResponse } from './generic-response';
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
    readonly active?: boolean;
    readonly profilePending?: boolean;
    readonly pendingProfile?: any;
    readonly receiveEmailNotifications?: boolean;
    readonly receiveUpdateNotifications?: boolean;
    readonly receiveAdminMessages?: boolean;
    readonly receiveSponsorMessages?: boolean;
    readonly receiveReferralMessages?: boolean;
    readonly currentSponsor?: string;
    readonly currentSponsorEmail?: string;
    readonly bankName?: string;
    readonly routingNumber?: string;
    readonly accountType?: string;
    readonly accountNumber?: string;
    readonly savedAccountNum?: string;
    readonly amountPaid?: number;
    readonly referrals?: { [id: string]: UserReferral };
    readonly referralIds?: string[];
    readonly referralCount?: number;
    readonly currentLevel?: number;
    readonly payBeyondLevel?: number;
    readonly leveledUp?: boolean;
    readonly hasQualifiedReferrals?: boolean;
    readonly hasReferralsBeyondLevel?: boolean;
    readonly orderPending?: boolean;
    readonly updatedAt?: string;
    readonly createdAt?: string;
    // Helpers //
    credits?: Credit[];
    requiresApproval?: true;
    settingPrize?: boolean;
}

export interface UserReferral {
    id: string;
    username: string;
    email: string;
    currentLevel: number;
    payBeyondLevel: number;
    unpaidLevels?: number;
    leveledUp: boolean;
    levels: number[][];
    addedOn: Date;
    transferredOn: string;
    currentSponsor: boolean;
    active: boolean;
    hidden: boolean | undefined;
    hold: boolean | undefined;
    holdReason: string | undefined;
    removed: boolean | undefined;
}

export interface HideReferralsResponse extends GenericResponse {
    ids: string[];
    hide: boolean;
}

export interface GetProfileResponse extends GenericResponse {
    user: User;
    unreadTotal?: number;
}

export interface GetReferralResponse extends GenericResponse {
    referral: User;
}

export interface RecordClickResponse extends GenericResponse {
    redirectTo: string;
    message: string;
}

export interface RemoveReferralsResponse extends GenericResponse {
    ids: string[];
}

export interface SetSponsorResponse extends GenericResponse {
    currentSponsor: string;
    currentSponsorEmail: string;
}

export interface Users extends GenericResponse {
    users: User[];
}
