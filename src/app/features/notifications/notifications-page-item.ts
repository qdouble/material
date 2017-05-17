import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'os-notifications-page-item',
  templateUrl: './notifications-page-item.html',
  styleUrls: ['./notifications-page-item.scss']
})

export class NotificationsPageItemComponent {
  @Input() notification;
  @Output() deleteNotifications = new EventEmitter();
  @Output() markNotificationsAsRead = new EventEmitter();
}