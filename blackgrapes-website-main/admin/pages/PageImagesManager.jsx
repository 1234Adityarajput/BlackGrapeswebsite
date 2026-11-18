import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Cloud,
  AlertCircle,
  Sparkles,
  Layers,
  Home,
  Info,
  Building2,
  Package,
  Briefcase,
  Sliders,
  Users
} from 'lucide-react';
import {
  getHomePage,
  updateHomePage,
  getPageSections,
  getServices,
  getProjects,
  getClients,
  getProducts,
  getITStaffing,
  getPartnership,
  getSiteSettings,
  updateSiteSettings,
  getTeamMembers,
  saveModuleApi,
  uploadMediaItem,
  resolveMediaUrl
} from '@backend/dataService';
import MediaPickerModal from '../components/MediaPickerModal';

export default function PageImagesManager() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [copiedId, setCopiedId] = useState(null);

  // Raw module data states
  const [homeData, setHomeData] = useState(null);
  const [sectionsData, setSectionsData] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [staffingData, setStaffingData] = useState(null);
  const [partnerData, setPartnerData] = useState(null);
  const [settingsData, setSettingsData] = useState(null);
  const [teamData, setTeamData] = useState([]);

  // Media Picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [uploadingTargetId, setUploadingTargetId] = useState(null);

  // Hidden direct file input
  const fileInputRef = useRef(null);
  const [directUploadTarget, setDirectUploadTarget] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        home,
        secs,
        srvs,
        projs,
        cls,
        prods,
        staff,
        part,
        sett,
        team
      ] = await Promise.all([
        getHomePage(),
        getPageSections('about'),
        getServices(),
        getProjects(),
        getClients(),
        getProducts(),
        getITStaffing(),
        getPartnership(),
        getSiteSettings(),
        getTeamMembers()
      ]);

      setHomeData(home || {});
      setSectionsData(secs || {});
      setServicesData(Array.isArray(srvs) ? srvs : []);
      setProjectsData(Array.isArray(projs) ? projs : []);
      setClientsData(Array.isArray(cls) ? cls : []);
      setProductsData(Array.isArray(prods) ? prods : []);
      setStaffingData(staff || {});
      setPartnerData(part || {});
      setSettingsData(sett || {});
      setTeamData(Array.isArray(team) ? team : []);
    } catch (err) {
      console.error('[PageImagesManager] Load error:', err);
      showToast('Error loading page images data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    // Listen for WebSocket updates from other tabs
    const handleUpdate = (e) => {
      const mod = e.detail?.module;
      if (['home_page', 'page_sections', 'services', 'projects', 'clients', 'products', 'it_staffing', 'partnership', 'site_settings', 'team_members'].includes(mod)) {
        loadAllData();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  // Construct unified list of images across all pages
  const buildImageList = () => {
    const list = [];

    // 1. Site Branding & Logos
    if (settingsData) {
      list.push({
        id: 'branding-logo',
        category: 'branding',
        pageName: 'Header & Brand',
        sectionName: 'Website Header Logo',
        description: 'Main brand logo displayed on navigation bar across all pages.',
        imageUrl: settingsData.logo_url || '',
        onUpdate: async (newUrl) => {
          const updated = { ...settingsData, logo_url: newUrl };
          setSettingsData(updated);
          await updateSiteSettings(updated);
        }
      });

      list.push({
        id: 'branding-favicon',
        category: 'branding',
        pageName: 'Browser Tab',
        sectionName: 'Website Favicon Icon',
        description: 'Favicon shown in browser tab and bookmark bars.',
        imageUrl: settingsData.favicon_url || '',
        onUpdate: async (newUrl) => {
          const updated = { ...settingsData, favicon_url: newUrl };
          setSettingsData(updated);
          await updateSiteSettings(updated);
        }
      });

      list.push({
        id: 'branding-footer-logo',
        category: 'branding',
        pageName: 'Footer & Brand',
        sectionName: 'Footer Brand Logo',
        description: 'Secondary logo shown in footer navigation area.',
        imageUrl: settingsData.footer_logo_url || settingsData.logo_url || '',
        onUpdate: async (newUrl) => {
          const updated = { ...settingsData, footer_logo_url: newUrl };
          setSettingsData(updated);
          await updateSiteSettings(updated);
        }
      });
    }

    // 2. Home Page Images
    if (homeData) {
      list.push({
        id: 'home-hero-badge',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'Hero Section Showcase Visual / Tech Badge',
        description: 'Main showcase image or tech visual in Home Hero section.',
        imageUrl: homeData.hero?.image || homeData.hero?.badge_image || homeData.hero?.hero_image || '',
        onUpdate: async (newUrl) => {
          const updated = {
            ...homeData,
            hero: {
              ...(homeData.hero || {}),
              image: newUrl,
              badge_image: newUrl,
              hero_image: newUrl
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      list.push({
        id: 'home-about-img',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'About Section Primary Visual',
        description: 'Primary showcase photograph in Home About Black Grapes section.',
        imageUrl: homeData.aboutSection?.showcaseImage || homeData.aboutSection?.image || homeData.about?.showcaseImage || homeData.about?.image || homeData.about?.image1 || '/images/blackgrapes-1.png',
        onUpdate: async (newUrl) => {
          const updated = {
            ...homeData,
            aboutSection: {
              ...(homeData.aboutSection || {}),
              showcaseImage: newUrl,
              image: newUrl
            },
            about: {
              ...(homeData.about || {}),
              showcaseImage: newUrl,
              image: newUrl,
              image1: newUrl
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      list.push({
        id: 'home-about-img2',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'About Section Secondary Visual',
        description: 'Secondary accent photograph in Home About section.',
        imageUrl: homeData.aboutSection?.innovationImage || homeData.about?.innovationImage || homeData.about?.image2 || '/images/tech-innovation.jpg',
        onUpdate: async (newUrl) => {
          const updated = {
            ...homeData,
            aboutSection: {
              ...(homeData.aboutSection || {}),
              innovationImage: newUrl
            },
            about: {
              ...(homeData.about || {}),
              image2: newUrl,
              innovationImage: newUrl
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      list.push({
        id: 'home-clock-img',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'Clock / Philosophy Visual',
        description: 'Illustration for the Brahma Muhurta / Clock philosophy section.',
        imageUrl: homeData.clockPhilosophy?.emblemImage || homeData.clock?.image || '/images/black_grapes_emblem.jpg',
        onUpdate: async (newUrl) => {
          const updated = {
            ...homeData,
            clockPhilosophy: {
              ...(homeData.clockPhilosophy || {}),
              emblemImage: newUrl
            },
            clock: {
              ...(homeData.clock || {}),
              image: newUrl
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      // Why Choose Us 3 Cards
      list.push({
        id: 'home-why-showcase',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'Why Choose Us - Card 01 (Security & Compliance)',
        description: 'Image displayed on Card 01 ("Enterprise Security & Compliance") in the WHY CHOOSE US section.',
        imageUrl: homeData.whyChooseUs?.showcaseImage || homeData.whyChooseUs?.pillars?.[0]?.image || '/images/enterprise-security.jpg',
        onUpdate: async (newUrl) => {
          const currentPillars = [...(homeData.whyChooseUs?.pillars || [
            { title: 'Enterprise Security & Compliance', subtitle: 'Unmatched Reliability', image: '/images/enterprise-security.jpg' },
            { title: 'Precision-Driven Engineering', subtitle: 'Uncompromising Quality', image: '/images/precision-code.jpg' },
            { title: 'End-to-End Strategic Lifecycle', subtitle: 'Dedicated Partnership', image: '/images/partnership-lifecycle.jpg' }
          ])];
          currentPillars[0] = { ...(currentPillars[0] || {}), image: newUrl };
          const updated = {
            ...homeData,
            whyChooseUs: {
              ...(homeData.whyChooseUs || {}),
              showcaseImage: newUrl,
              pillars: currentPillars
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      list.push({
        id: 'home-why-innovation',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'Why Choose Us - Card 02 (Precision & Innovation)',
        description: 'Image displayed on Card 02 ("Precision-Driven Engineering") in the WHY CHOOSE US section.',
        imageUrl: homeData.whyChooseUs?.innovationImage || homeData.whyChooseUs?.pillars?.[1]?.image || '/images/precision-code.jpg',
        onUpdate: async (newUrl) => {
          const currentPillars = [...(homeData.whyChooseUs?.pillars || [
            { title: 'Enterprise Security & Compliance', subtitle: 'Unmatched Reliability', image: '/images/enterprise-security.jpg' },
            { title: 'Precision-Driven Engineering', subtitle: 'Uncompromising Quality', image: '/images/precision-code.jpg' },
            { title: 'End-to-End Strategic Lifecycle', subtitle: 'Dedicated Partnership', image: '/images/partnership-lifecycle.jpg' }
          ])];
          currentPillars[1] = { ...(currentPillars[1] || {}), image: newUrl };
          const updated = {
            ...homeData,
            whyChooseUs: {
              ...(homeData.whyChooseUs || {}),
              innovationImage: newUrl,
              pillars: currentPillars
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      list.push({
        id: 'home-why-pillar-2',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'Why Choose Us - Card 03 (Dedicated Partnership)',
        description: 'Image displayed on Card 03 ("End-to-End Strategic Lifecycle") in the WHY CHOOSE US section.',
        imageUrl: homeData.whyChooseUs?.pillars?.[2]?.image || '/images/partnership-lifecycle.jpg',
        onUpdate: async (newUrl) => {
          const currentPillars = [...(homeData.whyChooseUs?.pillars || [
            { title: 'Enterprise Security & Compliance', subtitle: 'Unmatched Reliability', image: '/images/enterprise-security.jpg' },
            { title: 'Precision-Driven Engineering', subtitle: 'Uncompromising Quality', image: '/images/precision-code.jpg' },
            { title: 'End-to-End Strategic Lifecycle', subtitle: 'Dedicated Partnership', image: '/images/partnership-lifecycle.jpg' }
          ])];
          currentPillars[2] = { ...(currentPillars[2] || {}), image: newUrl };
          const updated = {
            ...homeData,
            whyChooseUs: {
              ...(homeData.whyChooseUs || {}),
              pillars: currentPillars
            }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });

      list.push({
        id: 'home-cta-banner',
        category: 'home',
        pageName: 'Home Page',
        sectionName: 'Bottom CTA Banner Visual / Background',
        description: 'Visual illustration & background displayed on the bottom "GET STARTED" banner (just above Footer).',
        imageUrl: homeData.ctaBanner?.image || homeData.ctaBanner?.bg_image || '',
        onUpdate: async (newUrl) => {
          const updated = {
            ...homeData,
            ctaBanner: { ...(homeData.ctaBanner || {}), image: newUrl, bg_image: newUrl }
          };
          setHomeData(updated);
          await updateHomePage(updated);
        }
      });
    }

    // 3. About Us Page Sections
    if (sectionsData) {
      if (sectionsData.about_hero) {
        list.push({
          id: 'about-hero-img',
          category: 'about',
          pageName: 'About Us Page',
          sectionName: 'About Hero Cover Image',
          description: 'Main high-impact visual in the About page header hero.',
          imageUrl: sectionsData.about_hero.content?.image || '',
          onUpdate: async (newUrl) => {
            const updated = {
              ...sectionsData,
              about_hero: {
                ...sectionsData.about_hero,
                content: { ...sectionsData.about_hero.content, image: newUrl }
              }
            };
            setSectionsData(updated);
            await saveModuleApi('page_sections', updated);
          }
        });
      }

      if (sectionsData.founders) {
        list.push({
          id: 'about-founders-photo',
          category: 'about',
          pageName: 'About Us Page',
          sectionName: 'Executive Founders Photo',
          description: 'Photograph of Mr. Arpit Jain & Mrs. Deepika Jain in leadership section.',
          imageUrl: sectionsData.founders.content?.photo || '',
          onUpdate: async (newUrl) => {
            const updated = {
              ...sectionsData,
              founders: {
                ...sectionsData.founders,
                content: { ...sectionsData.founders.content, photo: newUrl }
              }
            };
            setSectionsData(updated);
            await saveModuleApi('page_sections', updated);
          }
        });
      }

      if (sectionsData.workspace) {
        list.push({
          id: 'about-workspace-img',
          category: 'about',
          pageName: 'About Us Page',
          sectionName: 'Indore Headquarters & Workspace',
          description: 'Software development center & workspace photograph.',
          imageUrl: sectionsData.workspace.content?.image || '',
          onUpdate: async (newUrl) => {
            const updated = {
              ...sectionsData,
              workspace: {
                ...sectionsData.workspace,
                content: { ...sectionsData.workspace.content, image: newUrl }
              }
            };
            setSectionsData(updated);
            await saveModuleApi('page_sections', updated);
          }
        });
      }
    }

    // 4. Services Images (8+ services)
    if (Array.isArray(servicesData)) {
      servicesData.forEach((srv, idx) => {
        list.push({
          id: `service-img-${srv.id || idx}`,
          category: 'services',
          pageName: 'Services Page',
          sectionName: `${srv.title || 'Service Card'}`,
          description: `Showcase card photograph for ${srv.title}.`,
          imageUrl: srv.image || '',
          onUpdate: async (newUrl) => {
            const updated = [...servicesData];
            updated[idx] = { ...updated[idx], image: newUrl };
            setServicesData(updated);
            await saveModuleApi('services', updated);
          }
        });
      });
    }

    // 5. Projects Images
    if (Array.isArray(projectsData)) {
      projectsData.forEach((proj, idx) => {
        list.push({
          id: `project-img-${proj.id || idx}`,
          category: 'projects',
          pageName: 'Projects Portfolio',
          sectionName: `${proj.title || 'Project'} Showcase`,
          description: `Primary project showcase screenshot for ${proj.title}.`,
          imageUrl: proj.image || proj.cover_image || '',
          onUpdate: async (newUrl) => {
            const updated = [...projectsData];
            updated[idx] = { ...updated[idx], image: newUrl, cover_image: newUrl };
            setProjectsData(updated);
            await saveModuleApi('projects', updated);
          }
        });
      });
    }

    // 6. Clients Brand Logos
    if (Array.isArray(clientsData)) {
      clientsData.forEach((client, idx) => {
        list.push({
          id: `client-logo-${client.id || idx}`,
          category: 'clients',
          pageName: 'Our Clients',
          sectionName: `${client.name || 'Client'} Brand Logo`,
          description: `Company logo for ${client.name} in client trust marquee.`,
          imageUrl: client.logo || client.logo_url || '',
          onUpdate: async (newUrl) => {
            const updated = [...clientsData];
            updated[idx] = { ...updated[idx], logo: newUrl, logo_url: newUrl };
            setClientsData(updated);
            await saveModuleApi('clients', updated);
          }
        });
      });
    }

    // 7. Software Products
    if (Array.isArray(productsData)) {
      productsData.forEach((prod, idx) => {
        list.push({
          id: `product-img-${prod.id || idx}`,
          category: 'products',
          pageName: 'Our Products',
          sectionName: `${prod.name || 'Product'} Screenshot`,
          description: `Main UI showcase screenshot for proprietary software: ${prod.name}.`,
          imageUrl: prod.image || prod.screenshot || '',
          onUpdate: async (newUrl) => {
            const updated = [...productsData];
            updated[idx] = { ...updated[idx], image: newUrl, screenshot: newUrl };
            setProductsData(updated);
            await saveModuleApi('products', updated);
          }
        });

        if (prod.logo) {
          list.push({
            id: `product-logo-${prod.id || idx}`,
            category: 'products',
            pageName: 'Our Products',
            sectionName: `${prod.name || 'Product'} Logo Icon`,
            description: `Brand logo icon for ${prod.name}.`,
            imageUrl: prod.logo || '',
            onUpdate: async (newUrl) => {
              const updated = [...productsData];
              updated[idx] = { ...updated[idx], logo: newUrl };
              setProductsData(updated);
              await saveModuleApi('products', updated);
            }
          });
        }
      });
    }

    // 8. IT Staffing Solutions
    if (staffingData) {
      list.push({
        id: 'staffing-hero-img',
        category: 'staffing',
        pageName: 'IT Staffing Solutions',
        sectionName: 'IT Staffing Hero Visual',
        description: 'Header photograph in contractual IT staffing solution page.',
        imageUrl: staffingData.heroImage || '',
        onUpdate: async (newUrl) => {
          const updated = { ...staffingData, heroImage: newUrl };
          setStaffingData(updated);
          await saveModuleApi('it_staffing', updated);
        }
      });

      list.push({
        id: 'staffing-compliance-img',
        category: 'staffing',
        pageName: 'IT Staffing Solutions',
        sectionName: '28 States Statutory Compliance Image',
        description: 'Infographic/image for nationwide labor law compliance.',
        imageUrl: staffingData.complianceImage || '',
        onUpdate: async (newUrl) => {
          const updated = { ...staffingData, complianceImage: newUrl };
          setStaffingData(updated);
          await saveModuleApi('it_staffing', updated);
        }
      });
    }

    // 9. Partnership Page
    if (partnerData) {
      list.push({
        id: 'partner-hero-img',
        category: 'staffing',
        pageName: 'Partnership & Alliances',
        sectionName: 'Partner With Us Showcase Banner',
        description: 'Showcase banner image in Partner With Us program page.',
        imageUrl: partnerData.partnerImage || '',
        onUpdate: async (newUrl) => {
          const updated = { ...partnerData, partnerImage: newUrl };
          setPartnerData(updated);
          await saveModuleApi('partnership', updated);
        }
      });
    }

    // 10. Leadership & Team Members
    if (Array.isArray(teamData)) {
      teamData.forEach((mem, idx) => {
        list.push({
          id: `team-photo-${mem.id || idx}`,
          category: 'team',
          pageName: 'Leadership & Team',
          sectionName: `${mem.name || 'Team Member'} Profile Photo`,
          description: `Official photo for ${mem.name} (${mem.role || 'Member'}).`,
          imageUrl: mem.photo_url || mem.photo || '',
          onUpdate: async (newUrl) => {
            const updated = [...teamData];
            updated[idx] = { ...updated[idx], photo_url: newUrl, photo: newUrl };
            setTeamData(updated);
            await saveModuleApi('team_members', updated);
          }
        });
      });
    }

    return list;
  };

  const allImages = buildImageList();

  // Filter list by category and search
  const filteredImages = allImages.filter((item) => {
    if (activeTab !== 'all' && item.category !== activeTab) {
      return false;
    }
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.pageName.toLowerCase().includes(query) ||
      item.sectionName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  // Action: Open Media Picker for specific image
  const handleOpenPicker = (item) => {
    setSelectedTarget(item);
    setPickerOpen(true);
  };

  // Action: Media Picker Selected
  const handlePickerSelect = async (selectedUrl) => {
    if (selectedTarget && selectedTarget.onUpdate) {
      try {
        await selectedTarget.onUpdate(selectedUrl);
        showToast(`Updated "${selectedTarget.sectionName}" live on website!`, 'success');
      } catch (err) {
        showToast('Failed to update image', 'error');
      }
    }
  };

  // Action: Direct upload from PC
  const handleTriggerDirectUpload = (item) => {
    setDirectUploadTarget(item);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDirectFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !directUploadTarget) return;

    setUploadingTargetId(directUploadTarget.id);
    try {
      showToast(`Uploading ${file.name} to Cloudinary...`, 'success');
      const res = await uploadMediaItem(file, directUploadTarget.sectionName);
      const newUrl = res.url || res.data?.url;

      if (newUrl) {
        await directUploadTarget.onUpdate(newUrl);
        showToast(`Uploaded to Cloudinary & updated "${directUploadTarget.sectionName}"!`, 'success');
      } else {
        showToast('Failed to obtain uploaded cloud URL', 'error');
      }
    } catch (err) {
      showToast('Upload error: ' + (err.message || 'Failed'), 'error');
    } finally {
      setUploadingTargetId(null);
      setDirectUploadTarget(null);
      if (e.target) e.target.value = '';
    }
  };

  // Action: Delete / Clear Image
  const handleDeleteImage = async (item) => {
    if (window.confirm(`Clear/Remove the image for "${item.sectionName}" from the live website?`)) {
      try {
        await item.onUpdate('');
        showToast(`Removed image from "${item.sectionName}".`, 'success');
      } catch (err) {
        showToast('Failed to remove image', 'error');
      }
    }
  };

  // Action: Copy Image URL
  const handleCopyUrl = async (url, id) => {
    if (!url) {
      showToast('No image set for this section yet.', 'error');
      return;
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedId(id);
      showToast('Image URL copied to clipboard!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast('Failed to copy URL', 'error');
    }
  };

  // Category counts
  const categoryCounts = {
    all: allImages.length,
    home: allImages.filter((i) => i.category === 'home').length,
    about: allImages.filter((i) => i.category === 'about').length,
    services: allImages.filter((i) => i.category === 'services').length,
    projects: allImages.filter((i) => i.category === 'projects').length,
    clients: allImages.filter((i) => i.category === 'clients').length,
    products: allImages.filter((i) => i.category === 'products').length,
    staffing: allImages.filter((i) => i.category === 'staffing').length,
    branding: allImages.filter((i) => i.category === 'branding').length,
    team: allImages.filter((i) => i.category === 'team').length
  };

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`admin-toast ${toastType === 'error' ? 'admin-toast-error' : ''}`}>
          {toastType === 'error' ? (
            <AlertCircle size={18} color="#ef4444" />
          ) : (
            <CheckCircle size={18} color="#10b981" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input for direct computer uploads */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleDirectFileChange}
      />

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>Website Page Images Manager</h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.72rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontWeight: 600
              }}
            >
              <Cloud size={13} /> Cloudinary Sync Live
            </span>
          </div>
          <p className="admin-page-sub">
            Centralized hub to change, upload, and delete any photograph, card visual, or logo across every page of your website.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={loadAllData}
          disabled={loading}
          title="Reload fresh data from database"
        >
          <RefreshCw size={15} className={loading ? 'spin' : ''} />
          <span>Refresh All</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.25rem'
        }}
      >
        {[
          { key: 'all', label: 'All Pages', count: categoryCounts.all, icon: Layers },
          { key: 'home', label: 'Home Page', count: categoryCounts.home, icon: Home },
          { key: 'about', label: 'About Us', count: categoryCounts.about, icon: Info },
          { key: 'services', label: 'Services', count: categoryCounts.services, icon: Layers },
          { key: 'projects', label: 'Projects', count: categoryCounts.projects, icon: Package },
          { key: 'clients', label: 'Clients & Logos', count: categoryCounts.clients, icon: Building2 },
          { key: 'products', label: 'Software Products', count: categoryCounts.products, icon: Package },
          { key: 'staffing', label: 'Staffing & Alliances', count: categoryCounts.staffing, icon: Briefcase },
          { key: 'branding', label: 'Branding & Logos', count: categoryCounts.branding, icon: Sliders },
          { key: 'team', label: 'Team Members', count: categoryCounts.team, icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: isActive ? '1px solid var(--brand-orange)' : '1px solid var(--admin-border)',
                background: isActive ? 'rgba(248, 98, 0, 0.15)' : 'var(--admin-card-bg)',
                color: isActive ? '#fff' : '#9ca3af',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} color={isActive ? 'var(--brand-orange)' : '#9ca3af'} />
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '10px',
                  background: isActive ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.08)',
                  color: '#fff'
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="admin-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent', padding: '0.25rem 0' }}
            placeholder="Search by page name, section, service, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of Page Images */}
      {loading ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
          <RefreshCw size={32} className="spin" style={{ color: 'var(--brand-orange)', margin: '0 auto 1rem' }} />
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Loading website image sections from MongoDB Atlas...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <ImageIcon size={48} style={{ opacity: 0.3, margin: '0 auto 1rem', color: '#9ca3af' }} />
          <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>No image sections found</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto' }}>
            No image sections match your search "{searchQuery}".
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredImages.map((item) => {
            const hasImage = Boolean(item.imageUrl);
            const isCloudinary = hasImage && item.imageUrl.includes('cloudinary');
            const isTargetUploading = uploadingTargetId === item.id;

            return (
              <div
                key={item.id}
                className="admin-card"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  border: '1px solid var(--admin-border)',
                  position: 'relative'
                }}
              >
                {/* Card Top: Page Name & Status Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--brand-orange)',
                        background: 'rgba(248, 98, 0, 0.12)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        display: 'inline-block',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {item.pageName}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '0.98rem', color: '#fff', fontWeight: 600 }}>
                      {item.sectionName}
                    </h3>
                  </div>

                  <div>
                    {isCloudinary ? (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.45rem',
                          borderRadius: '4px',
                          background: 'rgba(16, 185, 129, 0.12)',
                          color: '#10b981',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        Cloudinary Live
                      </span>
                    ) : hasImage ? (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.45rem',
                          borderRadius: '4px',
                          background: 'rgba(234, 179, 8, 0.12)',
                          color: '#eab308',
                          border: '1px solid rgba(234, 179, 8, 0.3)'
                        }}
                      >
                        Local Asset
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.45rem',
                          borderRadius: '4px',
                          background: 'rgba(239, 68, 68, 0.12)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        No Image
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: '0 0 0.75rem 0', minHeight: '32px' }}>
                  {item.description}
                </p>

                {/* Image Preview Box */}
                <div
                  style={{
                    width: '100%',
                    height: '170px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginBottom: '0.85rem'
                  }}
                >
                  {isTargetUploading ? (
                    <div style={{ textAlign: 'center' }}>
                      <RefreshCw size={28} className="spin" style={{ color: 'var(--brand-orange)', margin: '0 auto 0.5rem' }} />
                      <span style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>Uploading to Cloudinary...</span>
                    </div>
                  ) : hasImage ? (
                    <img
                      src={resolveMediaUrl(item.imageUrl)}
                      alt={item.sectionName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: item.category === 'branding' || item.category === 'clients' ? 'contain' : 'cover',
                        padding: item.category === 'branding' || item.category === 'clients' ? '1rem' : 0
                      }}
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0.35';
                      }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                      <ImageIcon size={36} color="#6b7280" style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.78rem', color: '#6b7280', display: 'block' }}>No image set on live page</span>
                    </div>
                  )}

                  {/* Top-Right Preview Link */}
                  {hasImage && !isTargetUploading && (
                    <a
                      href={resolveMediaUrl(item.imageUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open full size in new tab"
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                {/* Current URL Snippet */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'monospace',
                      color: hasImage ? '#cbd5e1' : '#6b7280',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    title={item.imageUrl || 'No image'}
                  >
                    {item.imageUrl ? item.imageUrl.replace(/^https?:\/\//, '') : 'No image configured'}
                  </span>

                  {hasImage && (
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item.imageUrl, item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedId === item.id ? '#10b981' : '#9ca3af',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Copy full image link"
                    >
                      {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  {/* Select from Media Picker */}
                  <button
                    type="button"
                    onClick={() => handleOpenPicker(item)}
                    disabled={isTargetUploading}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.78rem',
                      justifyContent: 'center'
                    }}
                    title="Choose from Cloudinary Media Library"
                  >
                    <ImageIcon size={14} />
                    <span>Choose</span>
                  </button>

                  {/* Direct Upload to Cloudinary */}
                  <button
                    type="button"
                    onClick={() => handleTriggerDirectUpload(item)}
                    disabled={isTargetUploading}
                    className="admin-btn admin-btn-primary"
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.78rem',
                      justifyContent: 'center'
                    }}
                    title="Directly upload photo from computer to Cloudinary"
                  >
                    <Upload size={14} />
                    <span>{isTargetUploading ? 'Uploading...' : 'Upload'}</span>
                  </button>

                  {/* Clear / Delete from Page */}
                  {hasImage && (
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(item)}
                      disabled={isTargetUploading}
                      className="admin-btn admin-btn-danger"
                      style={{
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.78rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Clear image from this section"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Media Picker Modal */}
      {pickerOpen && selectedTarget && (
        <MediaPickerModal
          isOpen={pickerOpen}
          onClose={() => {
            setPickerOpen(false);
            setSelectedTarget(null);
          }}
          onSelectMedia={(url) => {
            handlePickerSelect(url);
            setPickerOpen(false);
            setSelectedTarget(null);
          }}
          mediaType="image"
        />
      )}
    </div>
  );
}
