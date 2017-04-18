import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'os-notifications-item',
  templateUrl: './notifications-item.html',
  styleUrls: ['./notifications-item.css']
})

export class NotificationsItemComponent {
  @Input() notification;
  @Output() deleteNotifications = new EventEmitter();
  @Output() markNotificationsAsRead = new EventEmitter();
}
