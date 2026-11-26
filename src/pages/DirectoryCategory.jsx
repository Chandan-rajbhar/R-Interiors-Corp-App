import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gavel,
  Car,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calculator,
  ArrowLeft,
  MapPin,
  Globe,
  BadgeCheck,
  Search,
  Building2,
  Layers,
  Map,
  X,
} from 'lucide-react';
import {
  MantaRestaurantsIcon,
  MantaLandscapingIcon,
  MantaConstructionIcon,
  MantaHealthcareIcon,
  MantaHvacIcon,
  MantaRealEstateIcon,
  MantaTruckingIcon,
} from '../assets/icons/MantaIcons';
import { AnimatedPage } from '../components/AnimatedPage';
import { CATEGORY_IMAGES, DIRECTORY_CATEGORIES } from '../data/directoryData';
import { MANTA_DIRECTORY_LISTINGS } from '../data/mantaDirectoryListings';
import { BUSINESS_INFO } from '../data/businessData';
import { SERVICES_DATA } from '../data/servicesData';

const CATEGORY_ICONS = {
  construction: MantaConstructionIcon,
  restaurants: MantaRestaurantsIcon,
  landscaping: MantaLandscapingIcon,
  healthcare: MantaHealthcareIcon,
  hvac: MantaHvacIcon,
  realestate: MantaRealEstateIcon,
  trucking: MantaTruckingIcon,
  lawyers: Gavel,
  automotive: Car,
};

function normalizeTel(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
}

function CompanyCard({ company, featured = false, image, categoryLabel }) {
  const [expanded, setExpanded] = useState(false);
  const telHref = company.phone ? normalizeTel(company.phone) : undefined;
  const hasLongDescription = (company.description?.length || 0) > 130;

  return (
    <div
      className={`bg-white rounded-2xl p-4 border shadow-sm transition-colors ${
        featured ? 'border-[#A71912]/40' : 'border-[#C7C7C7]/50'
      }`}
    >
      <div className="flex items-start gap-3">
        {image && (
          <img
            src={image}
            alt={`${company.name} — ${categoryLabel || 'Business'}`}
            loading="lazy"
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-200/80"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {featured && (
              <span className="px-2 py-0.5 rounded-full bg-[#A71912]/10 text-[#A71912] text-[10px] font-bold uppercase tracking-wide">
                Featured
              </span>
            )}
            {company.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                <BadgeCheck className="w-3 h-3" />
                Manta Verified
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-sm font-extrabold text-[#171717] leading-snug">
            {company.name}
          </h3>
        </div>
      </div>

      {(company.street || company.location) && (
        <div className="mt-2 flex items-start gap-1.5 text-xs text-neutral-600">
          <MapPin className="w-3.5 h-3.5 text-[#A71912] shrink-0 mt-0.5" />
          <span>
            {[company.street, company.location].filter(Boolean).join(', ')}
          </span>
        </div>
      )}

      {company.categories?.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {company.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 rounded-lg bg-neutral-100 text-neutral-700 text-[10px] font-medium"
            >
              {cat.replace(/^Categorized under\s+/i, '')}
            </span>
          ))}
        </div>
      )}

      {company.description && (
        <div className="mt-2.5 pt-2.5 border-t border-neutral-100">
          <p
            className={`text-xs text-neutral-600 leading-relaxed ${
              expanded ? '' : 'line-clamp-2'
            }`}
          >
            {company.description}
          </p>
          {hasLongDescription && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-1 text-[11px] font-bold text-[#A71912] cursor-pointer"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {(telHref || company.website) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {telHref && (
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-[11px] font-bold transition-colors"
            >
              <Phone className="w-3 h-3" />
              {company.phone}
            </a>
          )}
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A71912]/10 hover:bg-[#A71912]/20 text-[#A71912] text-[11px] font-bold transition-colors"
            >
              <Globe className="w-3 h-3" />
              Visit Website
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function DirectoryCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [query, setQuery] = useState('');
  const [showAllListings, setShowAllListings] = useState(false);

  const category = DIRECTORY_CATEGORIES.find((c) => c.id === categoryId);
  const mantaData = category ? MANTA_DIRECTORY_LISTINGS[category.id] : null;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredFeatured = useMemo(() => {
    if (!mantaData) return [];
    if (!normalizedQuery) return mantaData.featuredListings;
    return mantaData.featuredListings.filter((item) =>
      [item.name, item.location, item.street, ...(item.categories || [])]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(normalizedQuery))
    );
  }, [mantaData, normalizedQuery]);

  const filteredAll = useMemo(() => {
    if (!mantaData) return [];
    if (!normalizedQuery) return mantaData.allListings;
    return mantaData.allListings.filter((item) =>
      [item.name, item.location, item.street, ...(item.categories || [])]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(normalizedQuery))
    );
  }, [mantaData, normalizedQuery]);

  const filteredSubcategories = useMemo(() => {
    if (!mantaData) return [];
    if (!normalizedQuery) return mantaData.subcategories;
    return mantaData.subcategories.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
  }, [mantaData, normalizedQuery]);

  const filteredStates = useMemo(() => {
    if (!mantaData) return [];
    if (!normalizedQuery) return mantaData.states;
    return mantaData.states.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
  }, [mantaData, normalizedQuery]);

  if (!category) {
    return (
      <AnimatedPage>
        <div className="p-6 text-center space-y-4">
          <h1 className="text-lg font-bold text-[#171717]">Category Not Found</h1>
          <button
            type="button"
            onClick={() => navigate('/directory')}
            className="px-4 py-2.5 rounded-xl bg-[#A71912] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </button>
        </div>
      </AnimatedPage>
    );
  }

  const Icon = CATEGORY_ICONS[category.id] || MantaConstructionIcon;
  const visibleAllListings =
    showAllListings || normalizedQuery
      ? filteredAll
      : filteredAll.slice(0, 10);

  return (
    <AnimatedPage>
      {/* Category Header Banner */}
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#A71912] p-2 flex items-center justify-center shrink-0 shadow-md">
            <Icon className="w-8 h-8" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7C7C7]">
              Directory Category
            </span>
            <h1 className="text-xl font-black leading-tight">{category.label}</h1>
            <p className="text-xs text-neutral-300">{category.subtitle}</p>
            {mantaData?.totalBusinesses && (
              <span className="mt-1.5 inline-block px-2.5 py-0.5 rounded-full bg-[#A71912] text-white text-[10px] font-bold">
                {mantaData.totalBusinesses} US Businesses
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        {mantaData && (
          <section className="space-y-3">
            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Filter ${category.label.toLowerCase()} listings, subcategories, states...`}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-[#C7C7C7]/60 text-xs text-[#171717] placeholder:text-neutral-400 focus:outline-none focus:border-[#A71912]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear filter"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Section Tabs */}
            <div className="grid grid-cols-3 gap-1.5 bg-neutral-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('listings')}
                className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  activeTab === 'listings'
                    ? 'bg-white text-[#A71912] shadow-sm'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Listings ({filteredFeatured.length + filteredAll.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('subcategories')}
                className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  activeTab === 'subcategories'
                    ? 'bg-white text-[#A71912] shadow-sm'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Topics ({filteredSubcategories.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('states')}
                className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  activeTab === 'states'
                    ? 'bg-white text-[#A71912] shadow-sm'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                States ({filteredStates.length})
              </button>
            </div>

            {/* Tab Content: Listings */}
            {activeTab === 'listings' && (
              <div className="space-y-4">
                {filteredFeatured.length > 0 && (
                  <div className="space-y-2.5">
                    <h2 className="text-sm font-extrabold text-[#171717] px-1">
                      Featured Company Listings ({filteredFeatured.length})
                    </h2>
                    {filteredFeatured.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        featured
                        image={CATEGORY_IMAGES[category.id]}
                        categoryLabel={category.label}
                      />
                    ))}
                  </div>
                )}

                {visibleAllListings.length > 0 && (
                  <div className="space-y-2.5">
                    <h2 className="text-sm font-extrabold text-[#171717] px-1">
                      All Company Listings ({filteredAll.length})
                    </h2>
                    {visibleAllListings.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        image={CATEGORY_IMAGES[category.id]}
                        categoryLabel={category.label}
                      />
                    ))}

                    {!normalizedQuery && filteredAll.length > 10 && (
                      <button
                        type="button"
                        onClick={() => setShowAllListings((prev) => !prev)}
                        className="w-full py-2.5 rounded-xl bg-white border border-[#C7C7C7]/60 text-xs font-bold text-[#A71912] hover:border-[#A71912] transition-colors cursor-pointer"
                      >
                        {showAllListings
                          ? 'Show fewer listings'
                          : `Show all ${filteredAll.length} listings`}
                      </button>
                    )}
                  </div>
                )}

                {filteredFeatured.length === 0 && visibleAllListings.length === 0 && (
                  <div className="bg-white rounded-2xl p-6 text-center border border-[#C7C7C7]/50">
                    <p className="text-xs text-neutral-500">
                      No businesses matched &ldquo;{query}&rdquo;.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab Content: Subcategories */}
            {activeTab === 'subcategories' && (
              <div className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2">
                <h2 className="text-sm font-extrabold text-[#171717]">
                  {category.label} Subcategories
                </h2>
                {filteredSubcategories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {filteredSubcategories.map((sub) => (
                      <button
                        key={sub.name}
                        type="button"
                        onClick={() => {
                          setQuery(sub.name.split('-')[0].trim());
                          setActiveTab('listings');
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-50 hover:bg-[#A71912]/5 text-left transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-semibold text-[#171717]">
                          {sub.name}
                        </span>
                        <span className="text-[11px] font-bold text-[#A71912] shrink-0 ml-2">
                          {sub.count}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 py-3 text-center">
                    No subcategories matched &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>
            )}

            {/* Tab Content: States */}
            {activeTab === 'states' && (
              <div className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2">
                <h2 className="text-sm font-extrabold text-[#171717]">
                  Browse by State &amp; Territory
                </h2>
                {filteredStates.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {filteredStates.map((st) => (
                      <div
                        key={st.name}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-50"
                      >
                        <span className="text-xs font-semibold text-[#171717] truncate">
                          {st.name}
                        </span>
                        <span className="text-[11px] font-bold text-[#A71912] shrink-0 ml-1.5">
                          {st.count}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 py-3 text-center">
                    No states matched &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {/* Category Description */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm">
          <h2 className="text-sm font-extrabold text-[#171717]">
            {category.label} &amp; Wall Finishing Solutions
          </h2>
          <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
            {category.description}
          </p>

          <ul className="mt-3 space-y-2">
            {category.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* R Interiors Corp Services */}
        <section className="space-y-2.5">
          <h2 className="text-sm font-extrabold text-[#171717] px-1">
            R Interiors Corp Services
          </h2>
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => navigate(`/services/${service.slug}`)}
              className="w-full bg-white rounded-2xl p-3.5 border border-[#C7C7C7]/50 shadow-sm flex items-center justify-between gap-3 text-left hover:border-[#A71912]/50 transition-colors cursor-pointer"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#171717]">{service.title}</h3>
                <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                  {service.shortDescription}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#A71912] shrink-0" />
            </button>
          ))}
        </section>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2.5 pt-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/estimate')}
            className="w-full py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            Request a Free Estimate
          </motion.button>
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={BUSINESS_INFO.phoneHref}
            className="w-full py-3 px-4 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call {BUSINESS_INFO.phone}
          </motion.a>
        </div>
      </div>
    </AnimatedPage>
  );
}
