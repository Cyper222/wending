


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

type Props = { open: boolean; onClose: () => void; guestName?: string };

export default function RsvpModal({ open, onClose, guestName }: Props) {
  const [name, setName] = useState<string>(guestName || "");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("С удовольствием приду");

  // подключаем Formspree (замени "xdklknvy" на свой formId)
  const [state, handleSubmit] = useForm("xdklknvy");

  useEffect(() => {
    if (guestName) setName(guestName);
  }, [guestName]);

  // если форма успешно отправлена
  if (state.succeeded) {
    setTimeout(onClose, 2000);
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative glass rounded-2xl p-6 w-full max-w-md text-center"
            >
              <h3 className="font-display text-2xl text-rose-700">
                Спасибо{name ? `, ${name}` : ""}!
              </h3>
              <p className="text-gray-600 mt-2">Мы получили ваш ответ 💌</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="relative glass rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="font-display text-2xl text-rose-700">
              Подтвердите участие
            </h3>
            <p className="text-gray-600 mt-1">Мы будем рады вашему ответу</p>
            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-4"
            >
              <input
                required
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                readOnly={!!guestName}
                className="w-full rounded-lg border border-white/40 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              />

              <input
                required
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="w-full rounded-lg border border-white/40 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                className="w-full rounded-lg border border-white/40 bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option>С удовольствием приду</option>
                <option>К сожалению, не смогу</option>
              </select>

              {/* скрытое поле для заголовка письма */}
              <input type="hidden" name="formTitle" value="Wedding RSVP" />

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-full py-3 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 text-white font-medium shadow-glow"
              >
                {state.submitting ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
