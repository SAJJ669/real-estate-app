🏠 Real Estate Listing & Management Platform
A modern, full-stack real estate application designed for users to list, manage, and view properties. This platform features secure user authentication, real-time database management, and robust image handling.

🚀 Key Features
1) User Authentication: Secure sign-in and profile management powered by Clerk.
2) Property Listings: Users can create, edit, and publish property details including type, price, area, and descriptions.
3) Secure Route Guards: Custom logic to ensure users can only edit their own listings, preventing unauthorized access via URL manipulation.
4) Image Management: Multi-image upload support with storage hosted on Supabase.
5) Dynamic Search & Filter: Real-time property filtering based on location and property specifications.
6) Responsive UI: Fully mobile-responsive design built with Tailwind CSS and Shadcn/UI.

🛠️ Tech Stack
- Framework: Next.js (App Router)
- Authentication: Clerk
- Database & Storage: Supabase
- Form Management: Formik
- Styling: Tailwind CSS
- Components: Shadcn/UI
- Notifications: Sonner



⚙️ Implementation Highlights: Route Protection
1) The project utilizes a robust "Guard" pattern in the EditListing component to ensure data integrity:
2) Auth Check: Verifies the session via Clerk's isLoaded and isSignedIn states.
3) Ownership Verification: Queries Supabase to ensure the createdBy field matches the authenticated user's email before rendering the form.
4) Loading States: Implements a dedicated loading UI to prevent "flickering" or unauthorized content leaks during verification.
