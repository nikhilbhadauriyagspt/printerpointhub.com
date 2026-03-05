import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: "Official Warranty",
    desc: "Full coverage on all printers",
  },
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: "Fast Shipping",
    desc: "Quick delivery to your door",
  },
  {
    icon: <RotateCcw size={28} strokeWidth={1.5} />,
    title: "Easy Returns",
    desc: "Simple 7-day return policy",
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-16 border-b border-slate-100">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex items-start gap-6 p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500 group"
            >
              <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 shadow-sm">
                {item.icon}
              </div>

              <div className="flex flex-col pt-1">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
