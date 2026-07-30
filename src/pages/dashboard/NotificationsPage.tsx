import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ShieldCheck, Check, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, clearNotifications, markNotificationRead } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <Bell className="w-5 h-5 mr-2 text-[#4A7C59]" />
            System Notifications & Sync Logs
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Review live satellite updates, server response packets, and offline-first cache ledger sync outputs.
          </p>
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        )}
      </div>

      <div className="max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 space-y-4 shadow-sm">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-stone-400 space-y-2">
            <ShieldCheck className="w-10 h-10 text-[#4A7C59] mx-auto opacity-40" />
            <p className="text-sm font-bold">No active logs detected.</p>
            <p className="text-xs text-stone-500">Your system operations are fully synchronous.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-850">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`py-4 flex justify-between items-start gap-4 transition-all ${
                  notif.read 
                    ? 'bg-[#EBF1EB] dark:bg-stone-950/60 border border-[#CCD4CC] dark:border-stone-850 rounded-xl px-4 py-3' 
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950/60 rounded-xl px-4 py-3 shadow-sm'
                } mb-3`}
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      notif.type === 'success' ? 'bg-emerald-500' : notif.type === 'warning' ? 'bg-amber-500' : 'bg-[#4A7C59]'
                    }`}></span>
                    <h5 className={`font-bold ${notif.read ? 'text-[#2D4533] dark:text-stone-300' : 'text-[#0E2313] dark:text-white text-[13px]'}`}>{notif.title}</h5>
                  </div>
                  <p className={`leading-normal pl-4 ${notif.read ? 'text-[#3E4F3E] dark:text-stone-400 font-medium' : 'text-[#0E2313] dark:text-stone-100 font-bold'}`}>{notif.message}</p>
                  <p className={`text-[10px] font-mono pl-4 ${notif.read ? 'text-[#5A6F5A] dark:text-stone-500' : 'text-[#234A2F] dark:text-stone-300 font-semibold'}`}>{notif.timestamp}</p>
                </div>

                {!notif.read && (
                  <button
                    onClick={() => markNotificationRead(notif.id)}
                    className="p-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-250 dark:hover:bg-stone-700 rounded-lg text-[#4A7C59] dark:text-emerald-400 transition-colors cursor-pointer"
                    title="Mark as Read"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
