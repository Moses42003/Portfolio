"""seed admin

Revision ID: 0001_seed_admin
Revises: 
Create Date: 2026-08-24 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_seed_admin'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Insert default admin user if not present
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if 'admin_users' in inspector.get_table_names():
        from app.core.security import get_password_hash
        email = 'admin@moses.dev'
        password = get_password_hash('admin123')
        # Use parameterized insert to avoid SQL injection
        result = bind.execute(
            sa.text("SELECT id FROM admin_users WHERE email = :email"),
            {"email": email},
        )
        row = result.fetchone()
        if row is None:
            bind.execute(
                sa.text(
                    "INSERT INTO admin_users (email, password_hash, is_active, full_name) VALUES (:email, :pw, :active, :name)"
                ),
                {"email": email, "pw": password, "active": True, "name": "Administrator"},
            )


def downgrade():
    bind = op.get_bind()
    if sa.inspect(bind).has_table('admin_users'):
        bind.execute(sa.text("DELETE FROM admin_users WHERE email = :email"), {"email": 'admin@moses.dev'})
